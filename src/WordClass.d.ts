import { NomenPartClass } from "./NomenPartClass"
import { WordClassName } from "./WordClassName"
export type WordClass = Readonly<{
    antipattern?: RegExp
    class: NomenPartClass
    next: readonly WordClassName[]
    pattern: RegExp
}>
