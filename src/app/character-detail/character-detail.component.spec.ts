import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CharacterDetailComponent } from './character-detail.component';

describe('CharacterDetailComponent', () => {
    let component: CharacterDetailComponent;
    let fixture: ComponentFixture<CharacterDetailComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            declarations: [CharacterDetailComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CharacterDetailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should render default message', () => {
        fixture = TestBed.createComponent(CharacterDetailComponent);
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;
        expect(
            compiled.querySelector(
                '.character .character-details-box .character-details-text p'
            ).textContent
        ).toContain('Please select a character...');
    });
});
