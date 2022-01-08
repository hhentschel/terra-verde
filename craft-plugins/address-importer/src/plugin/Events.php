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
                $feedData = $event->feedData;

                $address = new Address();
                $address->title = $fieldValues['userTitle'] ?? $feedData['title'] ?? '';
                $address->firstName = $element->firstName ?? $feedData['first_name'] ?? '-';
                $address->lastName = $element->lastName ?? $feedData['last_name'] ?? '-';
                $address->address1 = !empty($fieldValues['userAdress']) ? $fieldValues['userAdress'] : (!empty($feedData['address_1']) ? $feedData['address_1'] : '-');
                $address->address2 = $fieldValues['userAdditionalAdress'] ?? $feedData['address_2'] ?? '';
                $address->city = !empty($fieldValues['userCity']) ? $fieldValues['userCity'] : (!empty($feedData['city']) ? $feedData['city'] : '-');
                $address->zipCode = !empty($fieldValues['userZip']) ? $fieldValues['userZip'] : (!empty($feedData['Postleitzahl']) ? $feedData['Postleitzahl'] : '0000');
                $address->businessName = $fieldValues['userCompany'] ?? $feedData['company'] ?? '';
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
