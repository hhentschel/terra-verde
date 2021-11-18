<?php

namespace pompom\addressimporter\plugin;

use craft\base\Element;
use craft\commerce\models\Address;
use craft\elements\User;
use craft\feedme\events\FeedProcessEvent;
use craft\feedme\services\Process as FeedMeProcess;
use pompom\addressimporter\AddressImporter;
use yii\base\Event;
use craft\commerce\Plugin as CommercePlugin;

/**
 * Trait Events
 *
 * @author Pom Pom Gmbh
 * @since 2.0
 */
trait Events
{
    // Private Methods
    // =========================================================================
    private function _registerEvents()
    {

        /**
         * Add address to customer account
         */
        Event::on(FeedMeProcess::class, FeedMeProcess::EVENT_STEP_AFTER_ELEMENT_SAVE, function (FeedProcessEvent $event) {
            /** @var Element $element */
            $element = $event->element;
            if ($element instanceof User) {
                $fieldValues = $element->getFieldValues();
                $userId = $element->id;
                $userEmail = $element->email;

                $customerService = CommercePlugin::getInstance()->getCustomers();
                $customer = $customerService->getCustomerByUserId($userId);
                if (!$customer || !$customer->id) {
                    AddressImporter::log(sprintf('Customer with userId %s does not exists. Matching by email address (%s)...', $userId, $userEmail));
                    $customerQuery = $customerService->getCustomersQuery();
                    $customer = $customerQuery->where('email = :email', ['email' => $userEmail])->one();
                    if (!$customer || !$customer->id) {
                        AddressImporter::log('Customer does not exists. Skipping...');
                        return;
                    }
                }

                $addresses = $customer->getAddresses();
                if (count($addresses)) {
                    AddressImporter::log(sprintf('Customer %s(%s) has already %s addresses.', $customer->id, $customer->email, count($addresses)));
                    return;
                }

                $address = new Address();
                $address->title = $fieldValues['userTitle'] ?? '';
                $address->firstName = $element->firstName ?? '-';
                $address->lastName = $element->lastName ?? '-';
                $address->address1 = $fieldValues['userAdress'] ?? '-';
                $address->address2 = $fieldValues['userAdditionalAdress'] ?? '';
                $address->city = $fieldValues['userCity'] ?? '-';
                $address->zipCode = $fieldValues['userZip'] ?? '0000';
                $address->businessName = $fieldValues['userCompany'] ?? '';
                $address->countryId = 215; // 215 Switzerland

                try {
                    if ($customerService->saveAddress($address, $customer)) {
                        $customer->primaryBillingAddressId = $address->id;
                        $customer->primaryShippingAddressId = $address->id;
                        if (!$customerService->saveCustomer($customer)) {
                            AddressImporter::log(implode(', ', $customer->getFirstErrors()));
                        }
                    } else {
                        AddressImporter::log(implode(', ', $address->getFirstErrors()));
                    }
                } catch (\Exception $e) {
                    AddressImporter::log($e->getMessage());
                }
            }
        });
    }
}
