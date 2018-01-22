import { Admin } from '../src/models/Admin';
import { Teacher } from '../src/models/Teacher';
import '../src/startDatabase';

beforeEach('Remove all Database TEST', async () => {
    await Admin.remove({});
    await Teacher.remove({});
});