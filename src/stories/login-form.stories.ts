import type { Meta, StoryObj } from '@storybook/angular';
import { LoginFormComponent } from '../app/components/login-form/login-form.component';
import { moduleMetadata } from '@storybook/angular';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { action } from 'storybook/actions';

const meta: Meta<LoginFormComponent> = {
  title: 'Shop/LoginForm',
  component: LoginFormComponent,
  decorators: [
    moduleMetadata({
      imports: [MatFormFieldModule, MatInputModule, MatButtonModule, FormsModule],
    }),
  ],
  args: {
    submit: action('submit') 
  }
};

export default meta;

export const Default: StoryObj<LoginFormComponent> = {};
