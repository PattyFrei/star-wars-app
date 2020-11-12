import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagesComponent } from './messages.component';

describe('MessagesComponent', () => {
    let component: MessagesComponent;
    let fixture: ComponentFixture<MessagesComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [MessagesComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(MessagesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should render default message', () => {
        fixture = TestBed.createComponent(MessagesComponent);
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;
        expect(
            compiled.querySelector('.system .system-logs div').textContent
        ).toContain('user @ star terminal:');
    });
});
