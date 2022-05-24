<?php
/**
 * @copyright Copyright (c) PutYourLightsOn
 */

namespace modules\retailpricing\adjusters;

use Craft;
use craft\base\Component;
use craft\commerce\base\AdjusterInterface;
use craft\commerce\elements\Order;
use craft\commerce\elements\Variant;
use craft\commerce\models\OrderAdjustment;
use yii\base\InvalidConfigException;

class RetailAdjuster extends Component implements AdjusterInterface
{
    const RETAIL_USER_GROUP_ID = 1;

    public function adjust(Order $order): array
    {
        $adjustments = [];
        $user = Craft::$app->user->identity;

        if ($user === null || !$user->isInGroup(self::RETAIL_USER_GROUP_ID)) {
            return $adjustments;
        }

        foreach ($order->getLineItems() as $item) {
            $variant = $item->getPurchasable();

            if ($variant instanceof Variant) {
                try {
                    $product = $variant->getProduct();
                    if ($product && $product->priceRetailTrader) {
                        $adjustment = new OrderAdjustment();
                        $adjustment->type = 'discount';
                        $adjustment->name = 'Retail';
                        $adjustment->sourceSnapshot = ['data' => 'value'];
                        $adjustment->amount = $product->priceRetailTrader - $variant->getPrice();
                        $adjustment->setOrder($order);
                        $adjustment->setLineItem($item);

                        $adjustments[] = $adjustment;
                    }
                }
                catch (InvalidConfigException $exception) {
                }
            }
        }

        return $adjustments;
    }
}
