import { Category } from "src/category/entities/category.entity"
import { User } from "src/user/entities/user.entity"
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

@Entity()
export class Transaction {
    @PrimaryGeneratedColumn({name: 'transaction_id'})
    id: number

    @Column()
    amount: string

    @Column({nullable: true})
    type: string

    @ManyToOne(() => Category, (category) => category.transactions)
    @JoinColumn({name: 'category_id'})
    category: Category
    
    @ManyToOne(() => User, (user) => user.categories)
    @JoinColumn({ name: 'user_id'})
    user: User

    @CreateDateColumn()
    createdAt: Date

    
    @UpdateDateColumn()
    updatedAt: Date
}
