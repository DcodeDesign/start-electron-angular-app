import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IBranch } from './interfaces/branch.interface';
import { BranchStatusEnum } from './enums/branch-status.enum';
import { urlValidator } from '../../forms/validations/url-validator';
import { v4 as uuidv4 } from 'uuid';
import { GoogleObj, GoogletranslateService } from '../../services/googletranslate.service';

@Component({
  selector: 'app-branch-name-generation-form',
  templateUrl: './branch-name-generation-form.component.html',
  styleUrls: ['./branch-name-generation-form.component.scss']
})
export class BranchNameGenerationFormComponent implements OnInit {
  @Input() branch: IBranch;
  @Output() createdBranch = new EventEmitter<IBranch>();
  branchForm: FormGroup;
  branchStatusEnum = BranchStatusEnum
  preview: string;
  validators = Validators

  constructor(private fb: FormBuilder, private googletranslateService: GoogletranslateService) { }

  ngOnInit(): void {
   this.initForm();

   this.branchForm.valueChanges.subscribe(value => {
      if (this.branchForm && this.branchForm.valid) {
        const branch = this.branchForm.value as IBranch;
        const status = branch?.status;
        const id = branch?.id;
        const text = branch?.text ? this.transformInput(branch.text) : null;;
        this.preview = `${status}/${id}-${text}`
      }
    })


    const googleObj: GoogleObj = {
      q: ['je suis un texte.'],
      target: 'en'
    };

    this.googletranslateService.translate(googleObj).subscribe(
      (res: any) => {
        console.log(res);
      }
    );
  }

  get linkControl() {
    return this.branchForm.get('link');
  }

  initForm() {
    this.branchForm = this.fb.group({
      uuid: [this.branch?.uuid || uuidv4(), Validators.required],
      status: [this.branch?.status || BranchStatusEnum.TASK , Validators.required],
      id: [this.branch?.id, Validators.required],
      text: [this.branch?.text , Validators.required],
      description: [this.branch?.description],
      link: [this.branch?.link]
    });
  }

  linkFieldOnBlur() {
    this.linkControl.valueChanges.subscribe(value => {
      if (value) {
        this.linkControl.setValidators([urlValidator()]);
      } else {
        this.linkControl.setValidators(null);
      }          
    }) 
  }

  get isInvalidUrlError() {
    return this.linkControl?.value && this.linkControl?.dirty && this.linkControl?.hasError('invalidUrl');
  }

  onSubmit() {
    if (this.branchForm && this.branchForm.valid) {
      const branch = this.branchForm.value as IBranch;
      branch.isNew = this.branch ? false : true;
      const status = branch?.status;
      const id = branch?.id;
      const text = branch?.text ? this.transformInput(branch.text) : null;
      branch.name = `${status}/${id}-${text}`
      this.initForm();
      console.log(branch);
      this.createdBranch.emit(branch)
    }
  }

  onPreview() {
    this.branchForm.valueChanges.subscribe(value => {
      if (this.branchForm && this.branchForm.valid) {
        const branch = this.branchForm.value as IBranch;
        const status = branch?.status;
        const id = branch?.id;
        const text = branch?.text ? this.transformInput(branch.text) : null;;
        this.preview = `${status}/${id}-${text}`
      }
    })
  }

  private transformInput(input: string): string {
      let transformed = input
      .replace(/é|è|ê|ë/g, 'e')
      .replace(/á|à|â|ä/g, 'a')
      .replace(/ó|ò|ô|ö/g, 'o')
      .replace(/ú|ù|û|ü/g, 'u')
      .replace(/í|ì|î|ï/g, 'i')
      .replace(/ý|ỳ|ŷ|ÿ/g, 'y')
      .replace(/ç/g, 'c')
      .replace(/ñ/g, 'n')

    transformed = transformed.replace(/\s/g, '-');

    transformed = transformed.toLowerCase();

    return transformed;
  }
}
