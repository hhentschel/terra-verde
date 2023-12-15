<?php

namespace modules\terraverdemodule\adjusters;

use craft\base\Component;
use craft\commerce\base\AdjusterInterface;
use craft\commerce\elements\Order;
use craft\commerce\models\OrderAdjustment;

class PriceRoundingAdjuster extends Component implements AdjusterInterface
{
  public const CENTS_TO_ROUND_DOWN_TO = 5;

  public function adjust(Order $order): array
  {
    $factor = 100 / self::CENTS_TO_ROUND_DOWN_TO;
    $roundedPrice = floor($order->totalPrice * $factor) / $factor;
    $difference = $roundedPrice - $order->totalPrice;

    if ($difference >= 0) {
      return [];
    }

    $adjustment = new OrderAdjustment();
    $adjustment->type = 'discount';
    $adjustment->name = 'Rundung';
    $adjustment->sourceSnapshot = ['data' => 'value'];
    $adjustment->amount = $difference;
    $adjustment->setOrder($order);

    return [$adjustment];
  }
}
