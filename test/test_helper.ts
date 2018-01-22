import { Admin } from '../src/models/Admin';
import '../src/startDatabase';

beforeEach('Remove all Database TEST', async () => {
    await Admin.remove({});
});