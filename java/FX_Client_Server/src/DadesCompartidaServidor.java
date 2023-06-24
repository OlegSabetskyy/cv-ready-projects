import javax.net.ssl.SSLSocket;

public class DadesCompartidaServidor {
	private String missatgeCompartit;
	private String nomClient;
	private SSLSocket socketTancarConnexio;
	private boolean stopServidor; //Per a avisar als thread de que el servidor s'ha d'apagar (en cas de que tingui que fer-ho)
	
	public DadesCompartidaServidor() {
		this.missatgeCompartit = "";
	}
	
	public void setMissatge(String dada) {
		this.missatgeCompartit = dada;
	}
	
	public String getMissatge() {
		return this.missatgeCompartit;
	}
	
	public void setNomClient(String nomClient) {
		this.nomClient = nomClient;
	}
	
	public String getNomClient() {
		return this.nomClient;
	}
	
	public void setSocketTancarConnexio(SSLSocket socketTancarConnexio) {
		this.socketTancarConnexio = socketTancarConnexio;
	}
	
	public SSLSocket getSocketTancarConnexio() {
		return this.socketTancarConnexio;
	}
	
	public void setStopServidor(boolean stopServidor) {
		this.stopServidor = stopServidor;
	}
	
	public boolean getStopServidor() {
		return stopServidor;
	}
}
