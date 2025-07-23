import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ReservationService } from '../service/reservation.service';
import { CreateReservationDto } from '../dto/create-reservation.dto';
import { UpdateReservationDto } from '../dto/update-reservation.dto';

@Controller()
export class ReservationEvent {
    constructor(private readonly reservationService: ReservationService) {}

    @MessagePattern('reservation.create')
    async create(@Payload() createReservationDto: CreateReservationDto) {
        return await this.reservationService.create(createReservationDto);
    }

    @MessagePattern('reservation.getAll')
    async getAll(@Payload() payload: { page?: number; limit?: number }) {
        return await this.reservationService.getAll(payload);
    }

    @MessagePattern('reservation.getById')
    async getById(@Payload() payload: { id: string }) {
        return await this.reservationService.getById(payload.id);
    }

    @MessagePattern('reservation.update')
    async update(@Payload() payload: { id: string; updateReservationDto: UpdateReservationDto }) {
        return await this.reservationService.update(payload.id, payload.updateReservationDto);
    }

    @MessagePattern('reservation.delete')
    async delete(@Payload() payload: { id: string }) {
        return await this.reservationService.delete(payload.id);
    }
}
