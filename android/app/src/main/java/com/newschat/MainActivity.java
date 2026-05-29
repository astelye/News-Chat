package com.newschat;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint;
import com.facebook.react.defaults.DefaultReactActivityDelegate;

public class MainActivity extends ReactActivity {

  /**
   * Retorna o nome do componente principal registrado no JavaScript.
   * Isso deve ser exatamente o mesmo nome que está no seu app.json ('newschat').
   */
  @Override
  protected String getMainComponentName() {
    return "newschat";
  }

  @Override
  protected ReactActivityDelegate createReactActivityDelegate() {
    return new DefaultReactActivityDelegate(
        this,
        getMainComponentName(),
        // Ativa a arquitetura padrão do React Native CLI 0.73
        DefaultNewArchitectureEntryPoint.getFabricEnabled());
  }
}