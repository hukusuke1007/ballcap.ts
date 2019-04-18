import * as firebase from '@firebase/testing'
import * as Ballcap from "../src/index"
import { Document } from '../src/Document'
import { Field } from '../src/Field'
import { } from "reflect-metadata"
import { Codable } from '../src/Codable';

const app = firebase.initializeAdminApp({
	projectId: "test-project"
})
Ballcap.initialize(app.firestore())

describe("Document", () => {

	test("id", async () => {
		class Doc extends Document {
			@Field a: string = "a"
			@Field b: string = `bb`
		}
		const doc: Doc = new Doc("a")
		expect(doc.documentReference.path).toEqual("version/1/doc/a")
	}, 100)

	test("documentReference", async () => {
		class Doc extends Document {
			@Field a: string = "a"
			@Field b: string = `bb`
		}
		const ref: firebase.firestore.DocumentReference = app.firestore().doc("a/a")
		const doc: Doc = new Doc(ref)
		expect(doc.documentReference.path).toEqual("a/a")
	}, 100)

	test("fromDataWithID", async () => {
		class Doc extends Document {
			@Field a: string = "a"
			@Field b: string = `bb`
		}
		const data = {
			a: "a",
			b: "bb"
		}
		const doc: Doc = Doc.fromData(data, "a")
		expect(doc.documentReference.path).toEqual("version/1/doc/a")
		expect(doc.a).toEqual("a")
		expect(doc.b).toEqual(`bb`)
	}, 100)

	test("fromDataWithRef", async () => {
		class Doc extends Document {
			@Field a: string = "a"
			@Field b: string = `bb`
		}
		const data = {
			a: "a",
			b: "bb"
		}
		const ref: firebase.firestore.DocumentReference = app.firestore().doc("a/a")
		const doc: Doc = Doc.fromData(data, ref)
		expect(doc.documentReference.path).toEqual("a/a")
		expect(doc.a).toEqual("a")
		expect(doc.b).toEqual(`bb`)
	}, 100)
})