/* tslint:disable:no-unused-variable */

import { Component } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { FilesizePipe } from './filesize.pipe';

describe('Pipe: Filesizee', () => {
  it('create an instance', () => {
    let pipe = new FilesizePipe();
    expect(pipe).toBeTruthy();
  });

  describe('Teste Isolado', () => {
    const pipe = new FilesizePipe();

    it('Deve converter de bytes para MB', () => {
      expect(pipe.transform(123456789)).toBe('117.74 MB');
      expect(pipe.transform(987654321)).toBe('941.90 MB');
    });

    it('Deve converter de bytes para GB', () => {
      expect(pipe.transform(1342177280)).toBe('1.25 GB');
    });

  });

  describe('Teste comportamental do Pipe', () => {
    @Component({
      template: `
        Size: {{ size | filesize }}
      `
    })
    class TestComponent {
      size = 123456789;
    }

    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;
    let el: HTMLElement;

    // antes de cada teste que será rodado, configurar o módulo em tempo de execução
    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [
          FilesizePipe,
          TestComponent
        ]
      });

      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;
      el = fixture.nativeElement;
    });

    it('Deve converter bytes para MB', () => {
      fixture.detectChanges();
      expect(el.textContent).toContain('Size: 117.74 MB');
      component.size = 1029281;
      fixture.detectChanges();
      expect(el.textContent).toContain('Size: 0.98 MB');
    });

    it('Deve converter bytes para GB', () => {1
      component.size = 1342177280;
      fixture.detectChanges();
      expect(el.textContent).toContain('Size: 1.25 GB');
    });


  });

});
