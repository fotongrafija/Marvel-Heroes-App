import '@testing-library/jest-dom';
import { TextEncoder } from 'util';

// Ensure that global has the correct type for TextEncoder and TextDecoder
global.TextEncoder = TextEncoder as unknown as typeof TextEncoder;




