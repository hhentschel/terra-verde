<?php

namespace henrik\userguide\controllers;

use craft\mail\Mailer;
use craft\web\Controller;
use craft\base\Plugin;

class FeedbackController extends Controller
{
  public function actionSend()

  {
    $request = \Craft::$app->getRequest();

    $subject = $request->getRequiredParam('subject');
    $topic = $request->getRequiredParam('topic');
    $message = $request->getRequiredParam('message');

    $user = \Craft::$app->getUser()->getIdentity();

    $settings = \henrik\userguide\Plugin::getInstance()->getSettings();

    $mailer = \Craft::$app->getmailer();

    $message = $mailer->compose()
      ->setFrom($user->email)
      ->setTo($settings->notificationEmail)
      ->setSubject('Nachricht von User Guide Website, ' . $topic . ': ' . $subject)
      ->setHtmlBody($message);

      $success = $message->send();

      if ($success) {
        \Craft::$app->getSession()->setNotice('Nachricht erfolgreich gesendet');
      }
      else {
        \Craft::$app->getSession()->setError('Nachricht konnte nicht gesendet werden');

      }

  }
}
