# Retail Pricing Module

Provides retail pricing from a custom field.

Install the module by adding and bootstrapping it in the `/config/app.php` file:

```php
return [
    'modules' => [
        'retail-pricing' => \modules\retailpricing\RetailPricing::class,
    ],
    'bootstrap' => ['retail-pricing'],
];
```
