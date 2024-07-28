import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column({ type: 'date' })
  birthdate: Date;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;
}
