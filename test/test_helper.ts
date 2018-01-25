import { Admin } from '../src/models/Admin';
import { Class } from '../src/models/Class';
import { Course } from '../src/models/Course';
import { Room } from '../src/models/Room';
import { ScheduleRoom } from '../src/models/ScheduleRoom';
import { Student } from '../src/models/Student';
import { Teacher } from '../src/models/Teacher';
import '../src/startDatabase';

beforeEach('Remove all Database TEST', async () => {
    await Admin.remove({});
    await Teacher.remove({});
    await Room.remove({});
    await ScheduleRoom.remove({});
    await Student.remove({});
    await Course.remove({});
    await Class.remove({});
});