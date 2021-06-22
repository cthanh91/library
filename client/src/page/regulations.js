import { useTranslation } from 'react-i18next';
import Container from '@material-ui/core/Container';
import { makeStyles } from "@material-ui/core/styles";
import Template from '../template';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: 50,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

const Regulations = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <Template>
      <Container maxWidth="md" className={classes.container}>
        <h1>{t('Regulations')}</h1>
        <ul>
          <li>
            {t('You need to return book to Library within 24 hous after clicking Return button on website, if not your account will be blocked for 6 months.')}
          </li>
          <li>
            {t('You need to go to the Library to get your books within 24 hours after clicking Borrow button on website, if not your request will be cancelled.')}
          </li>
          <li>{t('If you lost the book, you have to pay for it.')}</li>
          <li>
            {t('If you lost the Library card, you have to pay 50.000 VND.')}
          </li>
        </ul>
      </Container>
    </Template>
  );
};

export default Regulations;
