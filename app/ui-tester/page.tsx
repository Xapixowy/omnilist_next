'use client';

import Button from '@/components/ui/button';
import Checkbox from '@/components/ui/checkbox';
import Heading from '@/components/ui/heading';
import Input from '@/components/ui/input';
import Label from '@/components/ui/label';
import { ToastService } from '@/services/toast-service';
import { useEffect } from 'react';
import { ToastOptions } from 'react-hot-toast';

const testToasts = (): void => {
  const options: ToastOptions = {
    duration: 99999999,
  };

  ToastService.success(
    'Success',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris non tempor odio. Sed sagittis, dolor quis iaculis ultrices, lacus eros semper ante, sit amet gravida justo augue sit amet nunc.',
    options,
  );
  ToastService.error(
    'Error',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris non tempor odio. Sed sagittis, dolor quis iaculis ultrices, lacus eros semper ante, sit amet gravida justo augue sit amet nunc.',
    options,
  );
  ToastService.info(
    'Info',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris non tempor odio. Sed sagittis, dolor quis iaculis ultrices, lacus eros semper ante, sit amet gravida justo augue sit amet nunc.',
    options,
  );
  ToastService.warning(
    'Warning',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris non tempor odio. Sed sagittis, dolor quis iaculis ultrices, lacus eros semper ante, sit amet gravida justo augue sit amet nunc.',
    options,
  );
};

export default function UITesterPage() {
  useEffect(() => {
    testToasts();
  }, []);

  return (
    <>
      <div className='flex flex-col gap-4 p-4'>
        <Heading variant='display'>Display</Heading>
        <Heading variant='h1'>Heading 1</Heading>
        <Heading variant='h2'>Heading 2</Heading>
        <Heading variant='h3'>Heading 3</Heading>
        <Heading variant='h4'>Heading 4</Heading>
        <Heading variant='h5'>Heading 5</Heading>
        <Heading variant='h6'>Heading 6</Heading>
        <p>Paragraph</p>
      </div>
      <div className='flex flex-col gap-4 p-4'>
        <div className='flex flex-col gap-4'>
          <div className='flex gap-4'>
            <Button onClick={testToasts}>Default</Button>
            <Button rounded>Default</Button>
            <Button disabled>Default</Button>
            <Button loading>Default</Button>
          </div>
          <div className='flex gap-4'>
            <Button size='large'>Default</Button>
            <Button size='large' rounded>
              Default
            </Button>
            <Button size='large' disabled>
              Default
            </Button>
            <Button size='large' loading>
              Default
            </Button>
          </div>
        </div>
        <div className='flex flex-col gap-4'>
          <div className='flex gap-4'>
            <Button variant='primary'>Primary</Button>
            <Button variant='primary' rounded>
              Primary
            </Button>
            <Button variant='primary' disabled>
              Primary
            </Button>
            <Button variant='primary' loading>
              Primary
            </Button>
          </div>
          <div className='flex gap-4'>
            <Button variant='primary' size='large'>
              Primary
            </Button>
            <Button variant='primary' size='large' rounded>
              Primary
            </Button>
            <Button variant='primary' size='large' disabled>
              Primary
            </Button>
            <Button variant='primary' size='large' loading>
              Primary
            </Button>
          </div>
        </div>
        <div className='flex flex-col gap-4'>
          <div className='flex gap-4'>
            <Button variant='secondary'>Secondary</Button>
            <Button variant='secondary' rounded>
              Secondary
            </Button>
            <Button variant='secondary' disabled>
              Secondary
            </Button>
            <Button variant='secondary' loading>
              Secondary
            </Button>
          </div>
          <div className='flex gap-4'>
            <Button variant='secondary' size='large'>
              Secondary
            </Button>
            <Button variant='secondary' size='large' rounded>
              Secondary
            </Button>
            <Button variant='secondary' size='large' disabled>
              Secondary
            </Button>
            <Button variant='secondary' size='large' loading>
              Secondary
            </Button>
          </div>
        </div>
        <div className='flex flex-col gap-4'>
          <div className='flex gap-4'>
            <Button variant='success'>Success</Button>
            <Button variant='success' rounded>
              Success
            </Button>
            <Button variant='success' disabled>
              Success
            </Button>
            <Button variant='success' loading>
              Success
            </Button>
          </div>
          <div className='flex gap-4'>
            <Button variant='success' size='large'>
              Success
            </Button>
            <Button variant='success' size='large' rounded>
              Success
            </Button>
            <Button variant='success' size='large' disabled>
              Success
            </Button>
            <Button variant='success' size='large' loading>
              Success
            </Button>
          </div>
        </div>
        <div className='flex flex-col gap-4'>
          <div className='flex gap-4'>
            <Button variant='warning'>Warning</Button>
            <Button variant='warning' rounded>
              Warning
            </Button>
            <Button variant='warning' disabled>
              Warning
            </Button>
            <Button variant='warning' loading>
              Warning
            </Button>
          </div>
          <div className='flex gap-4'>
            <Button variant='warning' size='large'>
              Warning
            </Button>
            <Button variant='warning' size='large' rounded>
              Warning
            </Button>
            <Button variant='warning' size='large' disabled>
              Warning
            </Button>
            <Button variant='warning' size='large' loading>
              Warning
            </Button>
          </div>
        </div>
        <div className='flex flex-col gap-4'>
          <div className='flex gap-4'>
            <Button variant='danger'>Danger</Button>
            <Button variant='danger' rounded>
              Danger
            </Button>
            <Button variant='danger' disabled>
              Danger
            </Button>
            <Button variant='danger' loading>
              Danger
            </Button>
          </div>
          <div className='flex gap-4'>
            <Button variant='danger' size='large'>
              Danger
            </Button>
            <Button variant='danger' size='large' rounded>
              Danger
            </Button>
            <Button variant='danger' size='large' disabled>
              Danger
            </Button>
            <Button variant='danger' size='large' loading>
              Danger
            </Button>
          </div>
          <div className='flex gap-4'>
            <Button variant='info' size='large'>
              Info
            </Button>
            <Button variant='info' size='large' rounded>
              Info
            </Button>
            <Button variant='info' size='large' disabled>
              Info
            </Button>
            <Button variant='info' size='large' loading>
              Info
            </Button>
          </div>
        </div>
      </div>
      <div className='flex flex-col gap-4 p-4'>
        <div className='flex flex-col gap-2'>
          <Label>Text</Label>
          <Input type='text' placeholder='Placeholder' />
          <Input type='text' placeholder='Placeholder' disabled />
          <Input type='text' defaultValue='Value' />
          <Input type='text' defaultValue='Value' disabled />
        </div>
        <div className='flex flex-col gap-2'>
          <Label>Email</Label>
          <Input type='email' placeholder='Placeholder' />
          <Input type='email' placeholder='Placeholder' disabled />
          <Input type='email' defaultValue='Value' />
          <Input type='email' defaultValue='Value' disabled />
        </div>
        <div className='flex flex-col gap-2'>
          <Label>Number</Label>
          <Input type='number' placeholder='2137' />
          <Input type='number' placeholder='2137' disabled />
          <Input type='number' defaultValue='2137' />
          <Input type='number' defaultValue='2137' disabled />
        </div>
        <div className='flex flex-col gap-2'>
          <Label>Password</Label>
          <Input type='password' placeholder='Placeholder' />
          <Input type='password' placeholder='Placeholder' disabled />
          <Input type='password' defaultValue='Value' />
          <Input type='password' defaultValue='Value' disabled />
        </div>
        <div className='flex flex-col gap-2'>
          <Label>Search</Label>
          <Input type='search' placeholder='Placeholder' />
          <Input type='search' placeholder='Placeholder' disabled />
          <Input type='search' defaultValue='Value' />
          <Input type='search' defaultValue='Value' disabled />
        </div>
        <div className='flex flex-col gap-2'>
          <Label>Tel</Label>
          <Input type='tel' placeholder='Placeholder' />
          <Input type='tel' placeholder='Placeholder' disabled />
          <Input type='tel' defaultValue='Value' />
          <Input type='tel' defaultValue='Value' disabled />
        </div>
        <div className='flex flex-col gap-2'>
          <Label>Url</Label>
          <Input type='url' placeholder='Placeholder' />
          <Input type='url' placeholder='Placeholder' disabled />
          <Input type='url' defaultValue='Value' />
          <Input type='url' defaultValue='Value' disabled />
        </div>
        <div className='flex flex-col gap-2'>
          <Label>Date</Label>
          <Input type='date' />
          <Input type='date' disabled />
        </div>
        <div className='flex flex-col gap-2'>
          <Label>Datetime</Label>
          <Input type='datetime-local' />
          <Input type='datetime-local' disabled />
        </div>
        <div className='flex flex-col gap-2'>
          <Label>Month</Label>
          <Input type='month' />
          <Input type='month' disabled />
        </div>
        <div className='flex flex-col gap-2'>
          <Label>Week</Label>
          <Input type='week' />
          <Input type='week' disabled />
        </div>
        <div className='flex flex-col gap-2'>
          <Label>Time</Label>
          <Input type='time' />
          <Input type='time' disabled />
        </div>
        <div className='flex flex-col gap-2'>
          <Label>File</Label>
          <Input type='file' />
          <Input type='file' disabled />
        </div>
        <div className='flex flex-col gap-2'>
          <Label>Range</Label>
          <Input type='range' />
          <Input type='range' disabled />
        </div>
        <div className='flex flex-col gap-2'>
          <Label>Radio</Label>
          <div className='flex gap-2'>
            <Input type='radio' name='radio' id='radio1' />
            <Input type='radio' name='radio' id='radio2' />
          </div>
        </div>
        <div className='flex flex-col gap-2'>
          <Label>Checkbox</Label>
          <div className='flex gap-2'>
            <Checkbox id='checkbox1' />
            <Checkbox id='checkbox2' checked />
            <Checkbox id='checkbox3' checked disabled />
          </div>
        </div>
        <div className='flex flex-col gap-2'>
          <Label>Color</Label>
          <Input type='color' />
          <Input type='color' checked disabled />
        </div>
      </div>
    </>
  );
}
