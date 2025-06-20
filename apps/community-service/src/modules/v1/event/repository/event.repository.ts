// event.repository.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { InsertManyOptions, Model, QueryOptions, Types } from 'mongoose';
import { IRepository } from 'src/common/interfaces/base-repository.interface';
import { BaseRepository } from 'src/common/abstracts/base-repository.abstract';
import { Event, EventDocument } from '../schema/event.schema';
import { CreateEventDto } from '../dto/create-event.dto';
import { EventFilterDto } from '../dto/filter-event.dto';

@Injectable()
export class EventRepository extends BaseRepository<EventDocument> {
    constructor(@InjectModel(Event.name) model: Model<EventDocument>) {
        super(model);
    }

    async create(event: CreateEventDto, options?: QueryOptions): Promise<EventDocument> {
        const [created] = await this.model.create([event], options);
        return created;
    }

    async getAll(filterDto: EventFilterDto, options?: QueryOptions): Promise<EventDocument[]> {
        const query = this.buildQuery(filterDto);
        return this.model
            .find(query)
            .select('eventTitle description date startTime endTime image status targetAudience')
            .sort({ date: 1 })
            .setOptions(options)
            .lean();
    }

    private buildQuery(filterDto: EventFilterDto): any {
        const { branchId, status, search, targetAudience, fromDate, toDate } = filterDto;

        const query: any = {};

        if (status) {
            query.status = status;
        }

        if (targetAudience) {
            query.targetAudience = targetAudience;
        }

        // if (search) {
        //     query.$or = [
        //         { eventTitle: { $regex: search, $options: 'i' } },
        //         { description: { $regex: search, $options: 'i' } }
        //     ];
        // }

        if (fromDate || toDate) {
            query.date = {};

            if (fromDate) {
                query.date.$gte = new Date(fromDate);
            }

            if (toDate) {
                query.date.$lte = new Date(toDate);
            }
        }

        return query;
    }

    async getOne(id: string, options?: QueryOptions): Promise<EventDocument> {
        return this.model.findById(id).setOptions(options).lean();
    }

    async update(id: string, updateEventDto: any, options?: QueryOptions): Promise<any> {
        return this.model
            .findOneAndUpdate({ _id: id }, updateEventDto, {
                new: true,
                ...options,
            })
            .select('')
            .setOptions(options);
    }

    async delete(id: string, options?: QueryOptions): Promise<EventDocument> {
        return this.model.findByIdAndDelete(id, options).lean();
    }
}
