import { BaseError, Service, ServiceOptions } from 'ts-framework-common';
import SparkPost = require('sparkpost');
import EmailForgotPassword from '../utils/EmailForgotPassword';

const client = new SparkPost('PLEASE INPUT YOUR SPARKPOST API KEY HERE');

export interface NotificationServiceOptions extends ServiceOptions {
}

export default class NotificationService extends Service {
  protected static instance: NotificationService;
  public options: NotificationServiceOptions;

  constructor(options: NotificationServiceOptions) {
    super(options);
  }

  public static getInstance(options: NotificationServiceOptions) {
    if (!this.instance) {
      throw new BaseError("Notification service is invalid or hasn't been initialized yet");
    }
    return this.instance;
  }

  public static initialize(options: NotificationServiceOptions) {
    const service = new NotificationService(options);

    if(!this.instance) {
      this.instance = service;
    }

    return service;
  }

  public static async sendEmailForgotPassword(user) {
    try {

      const email = EmailForgotPassword(user.code);

      await client.transmissions.send({
        content: {
          from: 'contact@sympan.com.br',
          subject: email.subject,
          text: email.text,
          html: email.html
        },
        recipients: [
          {address: user.email}
        ]
      })
      .then(data => {
        console.log('Woohoo! You just sent your first mailing!');
        console.log(data);
      })
      .catch(err => {
        console.log('Whoops! Something went wrong');
        console.log(err);
      });
    } catch (error) {
      console.error(error)
    }
  }
  
  async onMount(): Promise<void> {
    this.logger.debug('Mounting NotificationService instance');
  }

  async onInit(): Promise<void> {
    this.logger.debug('Initializing NotificationService instance');
  }

  async onReady(): Promise<void> {
    this.logger.info('NotificationService initialized successfully');
  }

  async onUnmount(): Promise<void> {
    this.logger.debug('Unmounting NotificationService instance');
  }
}