export class TransDataFull {
    app_name;
    monos;
    
    apply(scope) {
        for (const mono of this.monos) scope.add(mono);
    }
}