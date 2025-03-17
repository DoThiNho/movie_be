import { Comment } from 'src/modules/comments/entities/comment.entity';
import { Like } from 'src/modules/likes/entities/like.entity';
import { Review } from 'src/modules/reviews/entities/review.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  phone: string;

  @Column()
  address: string;

  @Column()
  image: string;

  // @Column()
  // role: string;

  // @Column()
  // accountType: string;

  // @Column()
  // isActive: string;

  // @Column()
  // codeId: string;

  // @Column()
  // codeExpired: string;

  @OneToMany(() => Review, (review) => review.user, { onDelete: 'CASCADE' })
  reviews: Review[];

  @OneToMany(() => Comment, (comment) => comment.user, { onDelete: 'CASCADE' })
  comments: Comment[];

  @OneToMany(() => Like, (like) => like.user, { onDelete: 'CASCADE' })
  likes: Like[];

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
