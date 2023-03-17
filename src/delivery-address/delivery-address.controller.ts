import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { DeliveryAddressService } from './delivery-address.service';
import { AddressDto } from './dto/address.dto';

@Controller('delivery-address')
export class DeliveryAddressController {
  constructor(private readonly addressService: DeliveryAddressService) {}
  @Get('')
  @UseGuards(JwtAuthGuard)
  public async getAllUserAddresses(@Req() req) {
    return this.addressService.getUserAddress(req.user._id);
  }

  @Post('')
  @UseGuards(JwtAuthGuard)
  public async createUserAddress(@Body() addressDto: AddressDto, @Req() req) {
    return await this.addressService.createUserAddress(
      addressDto,
      req.user._id,
    );
  }

  @Put('/:addressId')
  @UseGuards(JwtAuthGuard)
  public async updateUserAddress(
    @Body() addressDto: AddressDto,
    @Param('addressId') addressId,
  ) {
    return await this.addressService.updateUserAddress(addressDto, addressId);
  }
  @Delete('/:addressId')
  @UseGuards(JwtAuthGuard)
  public async DeleteUserAddress(@Param('addressId') addressId) {
    return await this.addressService.DeleteUserAddress(addressId);
  }
  @Get('/find-one/:addressId')
  @UseGuards(JwtAuthGuard)
  public async getUserAddressById(@Param('addressId') addressId) {
    return await this.addressService.getUserAddressById(addressId);
  }
}
