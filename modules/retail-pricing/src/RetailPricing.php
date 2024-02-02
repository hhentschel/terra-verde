<?php
/**
 * @copyright Copyright (c) PutYourLightsOn
 */

namespace modules\retailpricing;

use Craft;
use craft\base\ElementInterface;
use craft\commerce\elements\db\VariantQuery;
use craft\commerce\elements\Variant;
use craft\commerce\services\OrderAdjustments;
use craft\elements\db\ElementQuery;
use craft\elements\User;
use craft\events\PopulateElementEvent;
use craft\events\RegisterComponentTypesEvent;
use modules\retailpricing\adjusters\RoundingAdjuster;
use yii\base\Event;
use yii\base\InvalidConfigException;
use yii\base\Module as Module;

class RetailPricing extends Module
{
  const RETAIL_USER_GROUP_ID = 1;
  const DISCOUNTED_RETAIL_USER_GROUP_ID = 11;
  const DISCOUNTED_RETAIL_USER_GROUP_PERCENTAGE = 23;

  public function init(): void
  {
    Craft::setAlias('@modules', __DIR__);

    $user = Craft::$app->getUser()->getIdentity();

    if ($user && $user->isInGroup(self::RETAIL_USER_GROUP_ID)) {
      Event::on(
        VariantQuery::class,
        ElementQuery::EVENT_AFTER_POPULATE_ELEMENT,
        function (PopulateElementEvent $event) use ($user) {
          $this->_applyRetailPrice($event->element, $user);
        }
      );
    } else {
      Event::on(
        OrderAdjustments::class,
        OrderAdjustments::EVENT_REGISTER_ORDER_ADJUSTERS,
        function (RegisterComponentTypesEvent $event) {
          $event->types[] = RoundingAdjuster::class;
        }
      );
    }

    parent::init();
  }

  /**
   * @param Variant $variant
   */
  private function _applyRetailPrice(ElementInterface $variant, User $user): void
  {
    try {
      $product = $variant->getProduct();
    } catch (InvalidConfigException $exception) {
      return;
    }

    if ($product && $product->priceRetailTrader) {
      $discountPercentage = 0;
      if ($user->isInGroup(self::DISCOUNTED_RETAIL_USER_GROUP_ID)) {
        $discountPercentage = self::DISCOUNTED_RETAIL_USER_GROUP_PERCENTAGE;
      }

      if ($discountPercentage) {
        // Apply percentage discount on `priceRetailTrader`
        $discount = $product->priceRetailTrader * ($discountPercentage / 100);

        $discountedPrice = $product->priceRetailTrader - $discount;

        // Round the final price to the nearest cent
        $variant->price = round($discountedPrice * 100) / 100;
      } else {
        $variant->price = $product->priceRetailTrader;
      }
    }
  }
}
