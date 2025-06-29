// event.service.ts
import { Injectable, HttpStatus } from '@nestjs/common';
import { EventRepository } from '../repository/event.repository';
import { CreateEventDto } from '../dto/create-event.dto';
import { UpdateEventDto } from '../dto/update-event.dto';
import { EventFilterDto } from '../dto/filter-event.dto';

@Injectable()
export class EventService {
    constructor(private readonly eventRepository: EventRepository) {}

    async create(createEventDto: CreateEventDto): Promise<any> {
        const eventData = this.prepareEventData(createEventDto);
        const createdEvent = await this.eventRepository.createEvent(eventData);

        return {
            statusCode: HttpStatus.CREATED,
            message: 'Event created successfully',
            data: createdEvent || {},
        };
    }

    async getAll(filter?: EventFilterDto): Promise<any> {
        return {
            statusCode: HttpStatus.OK,
            message: 'Events retrieved successfully',
            data: (await this.eventRepository.getAll(filter)) || {},
        };
    }

    async getOne(id: string): Promise<any> {
        return {
            statusCode: HttpStatus.OK,
            message: `Event with ID ${id} retrieved successfully`,
            data: (await this.eventRepository.getOne(id)) || {},
        };
    }

    async update(id: string, updateEventDto: UpdateEventDto): Promise<any> {
        const eventData = this.prepareEventData(updateEventDto);
        const updatedEvent = await this.eventRepository.updateEvent(id, eventData);

        return {
            statusCode: HttpStatus.OK,
            message: `Event with ID ${id} updated successfully`,
            data: updatedEvent,
        };
    }

    async delete(id: string): Promise<any> {
        return {
            statusCode: HttpStatus.OK,
            message: `Event with ID ${id} deleted successfully`,
            data: await this.eventRepository.delete(id),
        };
    }

    // async registerStudent(eventId: string, studentId: string): Promise<any> {
    //     const eventRegistrationData = {
    //         eventId,
    //         studentId,
    //         registeredAt: new Date(),
    //     };

    //     await this.eventRepository.createEventRegistrationStudent(eventRegistrationData);

    //     return {
    //         statusCode: HttpStatus.OK,
    //         message: `Student with ID ${studentId} registered for event with ID ${eventId} successfully`,
    //         data: eventRegistrationData,
    //     };
    // }

    // async unregisterStudent(eventId: string, studentId: string): Promise<any> {
    //     await this.eventRepository.deleteEventRegistrationStudent(eventId, studentId);

    //     return {
    //         statusCode: HttpStatus.OK,
    //         message: `Student with ID ${studentId} unregistered from event with ID ${eventId} successfully`,
    //         data: { eventId, studentId },
    //     };
    // }

    private prepareEventData(dto: any): any {
        // Extract branchId and rename it to branch, remove any duplicates
        const { course, branchId, branch, ...eventData } = dto;
        return {
            ...eventData,
            branch: branchId || branch, // Use branchId if available, otherwise use branch
            course: Array.isArray(course) ? JSON.stringify(course) : course, // Convert course array to JSON string for jsonb column
        };
    }
}
