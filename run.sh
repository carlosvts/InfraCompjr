#!/bin/bash
# Uso: ./run.sh [test | test:prod | ci | report | build | clean | logs]

case "$1" in
  test)      docker compose run --rm app ;;
  test:prod) docker compose --profile prod run --rm app-prod ;;
  ci)        docker compose --profile ci run --rm ci ;;
  report)    docker compose run --rm app && docker compose --profile report up report ;;
  build)     docker compose build ;;
  clean)     docker compose --profile prod --profile ci --profile report down -v --remove-orphans ;;
  logs)      docker logs jest-tests-dev 2>/dev/null || echo "Nenhum container encontrado." ;;
  *)         echo "Uso: ./run.sh [test | test:prod | ci | report | build | clean | logs]" ;;
esac