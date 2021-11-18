<?php
/**
 * AddressImporter plugin for Craft CMS 3.x
 *
 * Customer Address Importer for FeedMe
 *
 * @link      https://pom-pom.ch
 * @copyright Copyright (c) 2018 Pom Pom
 */

namespace pompom\addressimporter;

use Craft;
use craft\helpers\FileHelper;
use craft\helpers\Json;
use yii\base\ErrorException;
use pompom\addressimporter\plugin\Events;

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
 * @author    Pom Pom
 * @package   AddressImporter
 * @since     1.0.0
 */
class AddressImporter extends craft\base\Plugin
{

    // Traits
    // =========================================================================

    use Events;

    // Static Properties
    // =========================================================================


    /**
     * Static property that is an instance of this plugin class so that it can be accessed via
     * AddressImporter::$plugin
     *
     * @var AddressImporter
     */
    public static $plugin;

    // Public Properties
    // =========================================================================

    /**
     * To execute your plugin’s migrations, you’ll need to increase its schema version.
     *
     * @var string
     */
    public $schemaVersion = '1.0.0';

    // Public Methods
    // =========================================================================

    /**
     * Set our $plugin static property to this class so that it can be accessed via
     * AddressImporter::$plugin
     *
     * Called after the plugin class is instantiated; do any one-time initialization
     * here such as hooks and events.
     *
     * If you have a '/vendor/autoload.php' file, it will be loaded for you automatically;
     * you do not need to load it in your init() method.
     *
     */
    public function init()
    {
        parent::init();

        $this->_registerEvents();

        self::$plugin = $this;

        Craft::info(
            Craft::t(
                'address-importer',
                '{name} plugin loaded',
                ['name' => $this->name]
            ),
            __METHOD__
        );
    }

    // Protected Methods
    // =========================================================================

    /**
     * Custom logger
     * @param $message
     * @throws \yii\base\Exception
     */
    public static function log($message){
        $file = Craft::getAlias('@storage/logs/address-importer.log');
        if (is_object($message)) {
            $message = Json::decodeIfJson($message);
        }
        if (is_array($message)) {
            $message = Json::encode($message);
        }

        try {
            $log = date('Y-m-d H:i:s').' '.$message."\n";
            FileHelper::writeToFile($file, $log, ['append' => true]);
        } catch (ErrorException $e) {
            // Do nothing
        }
    }
}
