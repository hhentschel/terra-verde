<?php
/**
 * terraverde module for Craft CMS 3.x
 *
 * Link in The Control Panel
 *
 * @link      henrik-hentschel.de
 * @copyright Copyright (c) 2021 Henrik
 */

namespace modules\terraverdemodule;

use modules\terraverdemodule\assetbundles\terraverdemodule\TerraverdeModuleAsset;

use Craft;
use craft\events\RegisterTemplateRootsEvent;

use craft\events\TemplateEvent;
use craft\i18n\PhpMessageSource;
use craft\web\View;

use craft\commerce\events\LineItemEvent;
use craft\commerce\services\LineItems;
use craft\commerce\models\LineItem;

use craft\commerce\elements\Order;
use craft\commerce\elements\Discount;
use craft\commerce\events\AddLineItemEvent;

use yii\base\Event;
use yii\base\InvalidConfigException;
use yii\base\Module;

use craft\commerce\services\OrderAdjustments;
use craft\events\RegisterComponentTypesEvent;

/*use OrderAdjuster*/;

use GiftWrapAdjuster;
use GiftNoteAdjuster;
use PickUpDiscount;
use PickUpDiscountB2B;

// for adresse validation
use craft\commerce\models\Address;
use craft\base\Model;
use craft\commerce\services\Discounts;
use craft\events\DefineRulesEvent;

use craft\commerce\events\MatchLineItemEvent;

/**
 * Craft plugins are very much like little applications in and of themselves. We’ve made
 * it as simple as we can, but the training wheels are off. A little prior knowledge is
 * going to be required to write a plugin.
 *
 * For the purposes of the plugin docs, we’re going to assume that you know PHP and SQL,
 * as well as some semi-advanced concepts like object-oriented programming and PHP namespaces.
 *
 * https://craftcms.com/docs/plugins/introduction
 *
 * @author    Henrik
 * @package   TerraverdeModule
 * @since     1.0.0
 *
 */
class TerraverdeModule extends Module
{
  // Static Properties
  // =========================================================================

  /**
   * Static property that is an instance of this module class so that it can be accessed via
   * TerraverdeModule::$instance
   *
   * @var TerraverdeModule
   */
  public static $instance;

  const NO_STACKING_MAGIC_STRING = "'nogrouping' == 'nogrouping'";

  // Public Methods
  // =========================================================================

  /**
   * @inheritdoc
   */
  public function __construct($id, $parent = null, array $config = [])
  {
    Craft::setAlias('@modules/terraverdemodule', $this->getBasePath());
    $this->controllerNamespace = 'modules\terraverdemodule\controllers';

    // Translation category
    $i18n = Craft::$app->getI18n();
    /** @noinspection UnSafeIsSetOverArrayInspection */
    if (!isset($i18n->translations[$id]) && !isset($i18n->translations[$id . '*'])) {
      $i18n->translations[$id] = [
        'class' => PhpMessageSource::class,
        'sourceLanguage' => 'en-US',
        'basePath' => '@modules/terraverdemodule/translations',
        'forceTranslation' => true,
        'allowOverrides' => true,
      ];
    }

    // Base template directory
    Event::on(View::class, View::EVENT_REGISTER_CP_TEMPLATE_ROOTS, function (RegisterTemplateRootsEvent $e) {
      if (is_dir($baseDir = $this->getBasePath() . DIRECTORY_SEPARATOR . 'templates')) {
        $e->roots[$this->id] = $baseDir;
      }
    });

    Event::on(Discounts::class, Discounts::EVENT_DISCOUNT_MATCHES_LINE_ITEM, function (MatchLineItemEvent $event) {
      if ($event->discount->orderConditionFormula == self::NO_STACKING_MAGIC_STRING)
        if ($event->discount->purchaseQty > $event->lineItem->qty)
          $event->isValid = false;
    });

    // Set this as the global instance of this module class
    static::setInstance($this);

    parent::__construct($id, $parent, $config);
  }

  /**
   * Set our $instance static property to this class so that it can be accessed via
   * TerraverdeModule::$instance
   *
   * Called after the module class is instantiated; do any one-time initialization
   * here such as hooks and events.
   *
   * If you have a '/vendor/autoload.php' file, it will be loaded for you automatically;
   * you do not need to load it in your init() method.
   *
   */
  public function init()
  {

    parent::init();
    self::$instance = $this;

    // Discount >1000 -> 5%; > 2500 -> 10%
    // Discount Pick-Up -> 5%
    Event::on(
      OrderAdjustments::class,
      OrderAdjustments::EVENT_REGISTER_ORDER_ADJUSTERS,
      function (RegisterComponentTypesEvent $event) {

        /*$event->types[] = adjusters\OrderAdjuster::class;*/
        $event->types[] = adjusters\PickUpDiscount::class;
        $event->types[] = adjusters\PickUpDiscountB2B::class;
        $event->types[] = adjusters\GiftWrapAdjuster::class;
        $event->types[] = adjusters\GiftNoteAdjuster::class;
      });

    // run queue automatically
    Event::on(Order::class, Order::EVENT_AFTER_COMPLETE_ORDER, function (Event $e) {
      Craft::$app->getQueue()->run();
    });

    // Adress Validation
    Event::on(
      Address::class,
      Model::EVENT_DEFINE_RULES,
      function (DefineRulesEvent $event) {
        $rules = $event->rules;
        $rules[] = [['firstName', 'lastName', 'address1', 'city', 'zipCode', 'countryId'], 'required'];
        $event->rules = $rules;
      }
    );

    // Load our AssetBundle
    if (Craft::$app->getRequest()->getIsCpRequest()) {
      Event::on(
        View::class,
        View::EVENT_BEFORE_RENDER_TEMPLATE,
        function (TemplateEvent $event) {
          try {
            Craft::$app->getView()->registerAssetBundle(TerraverdeModuleAsset::class);
          } catch (InvalidConfigException $e) {
            Craft::error(
              'Error registering AssetBundle - ' . $e->getMessage(),
              __METHOD__
            );
          }
        }
      );
    }

    /**
     * Logging in Craft involves using one of the following methods:
     *
     * Craft::trace(): record a message to trace how a piece of code runs. This is mainly for development use.
     * Craft::info(): record a message that conveys some useful information.
     * Craft::warning(): record a warning message that indicates something unexpected has happened.
     * Craft::error(): record a fatal error that should be investigated as soon as possible.
     *
     * Unless `devMode` is on, only Craft::warning() & Craft::error() will log to `craft/storage/logs/web.log`
     *
     * It's recommended that you pass in the magic constant `__METHOD__` as the second parameter, which sets
     * the category to the method (prefixed with the fully qualified class name) where the constant appears.
     *
     * To enable the Yii debug toolbar, go to your user account in the AdminCP and check the
     * [] Show the debug toolbar on the front end & [] Show the debug toolbar on the Control Panel
     *
     * http://www.yiiframework.com/doc-2.0/guide-runtime-logging.html
     */
    Craft::info(
      Craft::t(
        'terraverde-module',
        '{name} module loaded',
        ['name' => 'terraverde']
      ),
      __METHOD__
    );
  }

  // Protected Methods
  // =========================================================================
}
