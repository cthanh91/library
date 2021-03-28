BASEDIR=$(dirname "$0") && \
echo "$BASEDIR" && \
npx sequelize-cli db:migrate && \
npx sequelize-cli db:seed:all && \
npm run start