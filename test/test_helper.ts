import { Admin } from '../src/models/Admin';
import { Room } from '../src/models/Room';
import { ScheduleRoom } from '../src/models/ScheduleRoom';
import { Teacher } from '../src/models/Teacher';
import '../src/startDatabase';

beforeEach('Remove all Database TEST', async () => {
    await Admin.remove({});
    await Teacher.remove({});
    await Room.remove({});
    await ScheduleRoom.remove({});
});