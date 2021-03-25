BASEDIR=$(dirname "$0") && \
echo "$BASEDIR" && \
npx sequelize-cli db:migrate && \
npm run start