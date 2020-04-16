import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm';
@Entity()
export class Candidate {
   @PrimaryGeneratedColumn("uuid")
   id: string;
   @Column()
   firstName: string;
   @Column()
   lastName: string
   @Column({default:false})
   deleted: boolean;
}
 