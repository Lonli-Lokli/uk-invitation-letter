import { sample } from 'effector'
import * as banner from './banner';
import * as contactForm from './contact-form'

sample({
    clock: banner.openContactModalClicked,
    target: contactForm.openFormClicked
})