import { FindIeltsExamsDto } from '../dto/find-ielts-exams.dto';

export class IeltsExamQueryBuilder {
  public static buildQuery(filterDto: FindIeltsExamsDto): any {
    const { search, status, fromDate, toDate } = filterDto;
    const query: any = {};

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    if (status) {
      query.status = status;
    }

    if (fromDate || toDate) {
      query.examDate = {};

      if (fromDate) {
        query.examDate.$gte = new Date(fromDate);
      }

      if (toDate) {
        query.examDate.$lte = new Date(toDate);
      }
    }

    return query;
  }
}
