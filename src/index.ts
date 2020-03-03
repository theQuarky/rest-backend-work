import app from './App';
import debug from 'debug';
import CONFIG from './config/config';

const PORT = CONFIG.PORT;
debug('booting %o');
app.listen(PORT, err => {
  if (err) {
    return debug(err);
  }
  debug(`Server is listening on http://127.0.0.1:${PORT}`);
});
