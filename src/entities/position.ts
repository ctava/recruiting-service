import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm';
@Entity()
export class Position {
   @PrimaryGeneratedColumn("uuid")
   id: string;
   @Column()
   title: string;
   @Column({nullable:true})
   level: number;
   @Column({default:false})
   deleted: boolean;
}
 