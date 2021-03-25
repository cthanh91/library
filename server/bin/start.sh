BASEDIR=$(dirname "$0") && \
echo "$BASEDIR" && \
npx sequelize-cli db:migrate && \
yarn start