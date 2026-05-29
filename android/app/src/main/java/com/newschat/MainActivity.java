package com.newschat;

import android.os.Bundle;
import androidx.appcompat.app.AppCompatActivity;
import android.widget.TextView;
import android.view.Gravity;
import android.graphics.Color;

public class MainActivity extends AppCompatActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        
        // Cria uma tela de teste simples para confirmar a instalação
        TextView textView = new TextView(this);
        textView.setText("NewsChat\nInicializado com Sucesso! 🎉");
        textView.setTextSize(26);
        textView.setTextColor(Color.BLACK);
        textView.setGravity(Gravity.CENTER);
        
        setContentView(textView);
    }
}