import { Class } from '../Class';
import { Course } from '../Course';

export class CourseService {
    static async addCourse(
        name: string,
        numberSession: number,
        startDate: Date,
        endDate: Date,
        tuition: number,
        detailInfor: string,
    ) {
        const course = new Course({ name, numberSession, startDate, endDate, tuition, detailInfor });
        await course.save();
        return course;
    }

    static async deleteCourse(idCourse: string) {
        // const course = await Course.findOne({ idCourse }) as Course;
        // if (course) throw new Error('Course is removing dependence the Schedule Course');
        const courseRemoved = await Course.findByIdAndRemove(idCourse) as Course;
        if (!courseRemoved) throw new Error('idCourse not found');
        return courseRemoved;
    }

    static async updateCourse(
        idCourse: string,
        newName: string,
        newNumberSession: number,
        newStartDate: Date,
        newEndDate: Date,
        newTuition: string,
        newDetailInfor: string,
    ) {
        // const scheduleCourse = await ScheduleCourse.findOne({ idCourse }) as ScheduleCourse;
        // if (scheduleCourse) throw new Error('Course is updating dependence the Schedule Course');
        const course = await Course.findByIdAndUpdate(idCourse,
            {
                name: newName,
                numberSession: newNumberSession,
                startDate: newStartDate,
                endDate: newEndDate,
                tuition: newTuition,
                detailInfor: newDetailInfor
            }, { new: true }) as Course;
        if (!course) throw new Error('idCourse not found');
        return course;
    }

    static async addClassToCourse(idCourse: string, idClass: string) {
        const cl = await Class.findById(idClass);
        if (!cl) throw new Error('idClass not found');
        const newCourse = await Course.findByIdAndUpdate(idCourse,
        {
            $addToSet: {
                listClass: idClass
            }
        }, { new: true });
        if (!newCourse) throw new Error('idCourse not found');
        return newCourse;
    }
}