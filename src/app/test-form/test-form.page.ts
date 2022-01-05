import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test-form',
  templateUrl: './test-form.page.html',
  styleUrls: ['./test-form.page.scss'],
})
export class TestFormPage implements OnInit {
  pin: string;
  constructor() { }

  ngOnInit() {
  }
  public onKeyUp(event: any) {
  }
  test() {
    let regExp = new RegExp('^[0-9]*$');
      console.log(regExp.test(this.pin))
  }

}
