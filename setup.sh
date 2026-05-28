#!/bin/bash

# ⚠️ IMPORTANTE: Este script DEVE ser executado ANTES de compilar o Android

set -e

echo "🔧 Reparando configuração do Gradle Wrapper..."

cd android

# Verifica se o Java está instalado
if ! command -v java &> /dev/null; then
    echo "❌ ERRO: Java não encontrado!"
    echo "Por favor, instale o JDK 11+ e configure JAVA_HOME"
    exit 1
fi

echo "✅ Java encontrado: $(java -version 2>&1 | head -1)"

# Torna o gradlew executável
chmod +x gradlew

echo ""
echo "📥 Baixando Gradle Wrapper (isso pode levar alguns minutos)..."
echo ""

# Baixa o Gradle Wrapper
if ! ./gradlew --version; then
    echo ""
    echo "❌ Erro ao baixar o Gradle Wrapper"
    echo ""
    echo "Alternativa: Execute manualmente:"
    echo "  cd android"
    echo "  ./gradlew --version"
    exit 1
fi

echo ""
echo "✅ Gradle Wrapper baixado com sucesso!"
echo ""

cd ..

echo "🎉 Setup do Gradle concluído!"
echo ""
echo "Agora você pode compilar:"
echo "  npm run android"
