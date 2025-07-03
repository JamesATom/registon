// university-search.entity.ts
import { ApiProperty } from '@nestjs/swagger';

export class UniversityEntity {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  id: string;

  @ApiProperty({ example: '2023-07-01T10:00:00Z' })
  createdAt: Date;

  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174001', required: false })
  createdBy?: string;

  @ApiProperty({ example: '2023-07-02T10:00:00Z' })
  updatedAt: Date;

  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174002', required: false })
  updatedBy?: string;

  @ApiProperty({ example: 'Harvard University' })
  title: string;

  @ApiProperty({ example: 'One of the most prestigious universities in the world', required: false })
  description?: string;

  @ApiProperty({ example: '2023-01-01T00:00:00Z' })
  registrationDate: Date;

  @ApiProperty({ example: 'Public', required: false })
  type?: string;

  @ApiProperty({ example: true, required: false })
  status?: boolean;

  @ApiProperty({ example: 'Full partnership' })
  contract: string;

  @ApiProperty({ example: 5, required: false })
  contacts?: number;

  @ApiProperty({ example: 'https://www.harvard.edu', required: false })
  website?: string;

  @ApiProperty({ example: 'info@harvard.edu', required: false })
  email?: string;

  @ApiProperty({ example: 'Cambridge, MA 02138, USA', required: false })
  address?: string;

  @ApiProperty({ example: 'https://example.com/logo.png', required: false })
  logo?: string;

  @ApiProperty({ example: 'LICENSE-12345', required: false })
  license?: string;

  @ApiProperty({ example: 'Cambridge', required: false })
  city?: string;

  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174003', required: false })
  certificateRequirementId?: string;
}


export class FacultyEntity {
    @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
    id: string;
    
    @ApiProperty({ example: '2023-07-01T10:00:00Z' })
    createdAt: Date;
    
    @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174001', required: false })
    createdBy?: string;
    
    @ApiProperty({ example: '2023-07-02T10:00:00Z' })
    updatedAt: Date;
    
    @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174002', required: false })
    updatedBy?: string;
    
    @ApiProperty({ example: 'Faculty of Arts and Sciences' })
    facultyTitle: string;
    
    @ApiProperty({ example: 'The heart of the University, serving as the nexus of teaching and research', required: false })
    description?: string;
    
    @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174003' })
    universityId: string;
}

export class UniversityWithFacultiesEntity extends UniversityEntity {
  @ApiProperty({ type: [FacultyEntity] })
  faculties: FacultyEntity[];
}


export class ProgramEntity {
    @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
    id: string;
    
    @ApiProperty({ example: '2023-07-01T10:00:00Z' })
    createdAt: Date;
    
    @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174001', required: false })
    createdBy?: string;
    
    @ApiProperty({ example: '2023-07-02T10:00:00Z' })
    updatedAt: Date;
    
    @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174002', required: false })
    updatedBy?: string;
    
    @ApiProperty({ example: 'Computer Science' })
    title: string;
    
    @ApiProperty({ example: 'English' })
    studyLanguage: string;
    
    @ApiProperty({ example: 15000 })
    contract: number;
    
    @ApiProperty({ example: 'Bachelor' })
    degree: string;
    
    @ApiProperty({ example: 'Full-time', required: false })
    studyType?: string;
    
    @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174003', required: false })
    facultyId?: string;
    
    @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174004' })
    universityId: string;
    
    @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174005', required: false })
    certificateRequirementId?: string;
}

export class FacultyWithProgramsEntity extends FacultyEntity {
  @ApiProperty({ type: [ProgramEntity] })
  programs: ProgramEntity[];

  @ApiProperty({ type: UniversityEntity })
  university: UniversityEntity;
}

export class CertificateRequirementEntity {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  id: string;

  @ApiProperty({ example: '2023-07-01T10:00:00Z' })
  createdAt: Date;

  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174001', required: false })
  createdBy?: string;

  @ApiProperty({ example: '2023-07-02T10:00:00Z' })
  updatedAt: Date;

  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174002', required: false })
  updatedBy?: string;

  @ApiProperty({ example: 'Standard Admission Requirements' })
  certificateRequirementsTitle: string;

  @ApiProperty({ example: 'These are the standard requirements for admission', required: false })
  description?: string;
}

export class ProgramWithDetailsEntity extends ProgramEntity {
  @ApiProperty({ type: FacultyEntity, required: false })
  faculty?: FacultyEntity;

  @ApiProperty({ type: UniversityEntity })
  university: UniversityEntity;

  @ApiProperty({ type: CertificateRequirementEntity, required: false })
  certificateRequirement?: CertificateRequirementEntity;
}

