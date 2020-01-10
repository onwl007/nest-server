import * as geoip from 'geoip-lite';
import { Logger } from 'winston';
import { Injectable, HttpService, Inject } from '@nestjs/common';
import { ConfigService } from '../config/config.service';
import { WINSTON_LOGGER_TOKEN } from '../../core/constants/system.constants';

export type IP = string;
export interface IIPDetail {
  city: string;
  country: string;
}

@Injectable()
export class IpService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    @Inject(WINSTON_LOGGER_TOKEN) private readonly logger: Logger,
  ) {}

  /**
   * 通过阿里云查询 IP 地址
   * @param ip IP 地址
   */
  private async queryIpByAliyun(ip: IP): Promise<IIPDetail> {
    try {
      const response = await this.httpService.axiosRef.request({
        headers: {
          Authorization: `APPCODE ${this.configService.get(
            'ALIYUN_IP_APPCODE',
          )}`,
        },
        url: `https://api01.aliyun.venuscn.com/ip?ip=${ip}`,
      });
      if (response.data && response.data.ret === 200) {
        return response.data.data;
      } else {
        throw new Error(response.data);
      }
    } catch (error) {
      this.logger.warn('Aliyun 查询 IP 信息失败! %o', error);
      throw error;
    }
  }

  /**
   * 通过 GEO 库查询
   * @param ip IP 地址
   */
  private queryByGeo(ip: IP): Promise<IIPDetail> {
    return geoip.lookup(ip);
  }

  public async queryIp(ip: IP): Promise<IIPDetail> {
    try {
      const { city, country } = await this.queryIpByAliyun(ip);
      return {
        city,
        country,
      };
    } catch (error) {
      return this.queryByGeo(ip);
    }
  }
}
