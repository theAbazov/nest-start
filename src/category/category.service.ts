import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>
  ) { }

  async create(createCategoryDto: CreateCategoryDto, id: number) {
    const isExist = await this.categoryRepository.findBy({
      user: { id },
      title: createCategoryDto.title
    })

    if (isExist.length) throw new BadRequestException('[CATEGORY_SERVICE]: This category is alrady exist!!!')

    const newCategory = { title: createCategoryDto.title, user: { id } }

    return await this.categoryRepository.save(newCategory);
  }

  async findAllByUser(id: number) {
    return await this.categoryRepository.find({
      where: { user: { id } },
      relations: { transactions: true }
    });
  }

  async findAll() {
    return await this.categoryRepository.find();
  }

  async findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return await this.categoryRepository.update(id, updateCategoryDto);
  }

  async remove(id: number) {
    try {
      const category = await this.categoryRepository.findBy({ id })
      await this.categoryRepository.delete(category[0].id)
      return { status: 'DELETED', ...category };
    } catch (error) {
      throw new NotFoundException('[Category]: Category not found]')
    }
  }
}
