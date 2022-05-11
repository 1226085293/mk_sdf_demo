import { _decorator, Component, Node } from "cc";
import * as cc from "cc";
const { ccclass, property } = _decorator;

@ccclass("scene_sdf_texture")
export class scene_sdf_texture extends Component {
	public button_close(): void {
		cc.director.loadScene("main");
	}
}
