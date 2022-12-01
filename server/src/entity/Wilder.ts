import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from "typeorm";
import Skill from "./Skill";

@Entity()
class Wilder {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  bio?: string;

  @Column({ nullable: true })
  city?: string;

  @Column({ nullable: true })
  avatarUrl?: string;

  @ManyToMany(() => Skill, { eager: true })
  @JoinTable()
  skills: Skill[];
}

export default Wilder;
