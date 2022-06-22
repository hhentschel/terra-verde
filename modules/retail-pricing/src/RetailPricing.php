<?php
/**
 * @copyright Copyright (c) PutYourLightsOn
 */

namespace modules\retailpricing;

use Craft;
use craft\commerce\elements\Variant;
use craft\commerce\events\LineItemEvent;
use craft\commerce\models\LineItem;
use craft\commerce\services\LineItems;
use yii\base\Event;
use yii\base\InvalidConfigException;
use yii\base\Module as Module;

class RetailPricing extends Module
{
    const RETAIL_USER_GROUP_ID = 1;

    public function init()
    {
        Craft::setAlias('@modules', __DIR__);

        $user = Craft::$app->getUser()->getIdentity();

        if ($user && $user->isInGroup(self::RETAIL_USER_GROUP_ID)) {
            Event::on(
                LineItems::class,
                LineItems::EVENT_POPULATE_LINE_ITEM,
                function (LineItemEvent $event) {
                    $this->_applyRetailPrice($event->lineItem);
                }
            );
        }

        parent::init();
    }

    private function _applyRetailPrice(LineItem $lineItem)
    {
        $purchasable = $lineItem->getPurchasable();

        if (!($purchasable instanceof Variant)) {
            return;
        }

        try {
            $product = $purchasable->getProduct();
        }
        catch (InvalidConfigException $exception) {
            return;
        }

        if ($product && $product->priceRetailTrader) {
            // Update the purchasable price so that the retail trader price
            // is used as a basis for calculating the sale price.
            $purchasable->price = $product->priceRetailTrader;
            $lineItem->setPurchasable($purchasable);
        }
    }

    private function _roundFinalPrice(LineItem $lineItem)
    {
        // The number of cents to which to round to.
        $centsToRoundDownTo = 5;
        $factor = 100 / $centsToRoundDownTo;
        $lineItem->salePrice = floor($lineItem->salePrice * $factor) / $factor;
    }
}
