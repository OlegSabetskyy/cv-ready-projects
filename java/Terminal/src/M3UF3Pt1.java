import java.io.File;
import java.io.FileNotFoundException;
import java.util.Scanner;
import metodes.comandes;

public class M3UF3Pt1 {

	public static void main(String[] args) throws FileNotFoundException {
		M3UF3Pt1 programa = new M3UF3Pt1();
		programa.inici();
	}
	
	public void inici() throws FileNotFoundException{
		
		boolean acabar = false; //Controle el que el programa pari o no d'executar-se
		//Scanner lector = new Scanner(System.in);
		comandes com = new comandes(); //Objecte de la llibreria de comandes
		String comencamentDirectori = System.getProperty("user.dir"); //String que contindra la ruta completa en tot moment
		
		while(!acabar){
			File comencamentDirectoriFile = new File(comencamentDirectori); //Arxiu neceessari per a després fer operacions en ell
			com.directoriActual(comencamentDirectoriFile);
			String comanda = com.llegirComanda();
			String [] comandesSplit = new String[com.contarParaules(comanda)];
			comandesSplit = comanda.split(" ");
			
			//Conte el numero de directoris que hi ha fins a arribar al que estem situats
			String[] ruta = new String[com.contarDirectoris(comencamentDirectoriFile)];
			
			//Guardar la ruta en un array
			com.guardarEnArray(ruta, comencamentDirectoriFile);
			
			//Comandes de 1 sola paraula (com: surt, llista, etc)
			if(com.contarParaules(comanda)==1){
				if(com.revisarComanda(comandesSplit).matches("surt")){
					comencamentDirectori =com.surt(ruta, comencamentDirectoriFile);
				}else if(com.revisarComanda(comandesSplit).matches("llista")){
					com.llistarDirectoris(comencamentDirectoriFile);
				}else if(com.revisarComanda(comandesSplit).matches("acabar")){
					acabar = true;
				}else{
					System.out.println("La comanda no s'entèn");
				}
			//Comandes de 2 paraules (com: entra, mostra, etc)
			}else if(com.contarParaules(comanda)==2){
				if(com.revisarComanda(comandesSplit).matches("entra")){
					comencamentDirectori =com.entra(ruta, comencamentDirectoriFile, comandesSplit, comencamentDirectori);
				}else if(com.revisarComanda(comandesSplit).matches("mostra")){
					com.mostra(comencamentDirectori, comandesSplit);
				}else if(com.revisarComanda(comandesSplit).matches("meta")){
					com.meta(comencamentDirectori, comandesSplit);
				}else {
					System.out.println("La comanda no s'entèn");
				}
			//Comandes de 3 paraules
			}else if(com.contarParaules(comanda)==3){
				if(com.revisarComanda(comandesSplit).matches("copia")){
					//Origen existeix
					if(com.comprovarOrigen(comencamentDirectori, comandesSplit)){
						//Destí existeix o no
						if(com.comprovarDesti(comencamentDirectori, comandesSplit)){
							System.out.println("El fitxer ja existeix.");
						}else{
							//Copia els bytes
							com.copiarBytes(comencamentDirectori, comandesSplit);
						}
					}else{
						System.out.println("El fitxer que vol copiar no existeix.");
					}
				}
			}else{
				if(com.revisarComanda(comandesSplit).matches("basura")){
					if(com.comprovarExisteix(comencamentDirectori, comandesSplit)){
						com.basura(comencamentDirectori, comandesSplit);
					}else{
						System.out.println("Ho sentim, pero l'arxiu ja existeix");
					}
				}else {
					System.out.println("Ho sento. pero la seva comanda no l'entenc");
				}
			}
		}
	}
}
