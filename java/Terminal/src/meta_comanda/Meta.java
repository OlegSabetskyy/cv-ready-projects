package meta_comanda;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.RandomAccessFile;
import java.util.Scanner;


public class Meta {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		Meta programa = new Meta();
		programa.inici(args);
	}
	
	public void inici(String[] args){
		String nomImatge = "";
		if(args.length == 0){
			System.out.print("Quin és el nom de la imatge? ");
			nomImatge = llegirResposta();
		}else{
			nomImatge = args[0];
		}
		File fitxer = new File(nomImatge);
		try {
			if(fitxer.exists()) {
				RandomAccessFile raf = new RandomAccessFile(fitxer, "r");
				for(int x = 0;x<1;x++){
					char a = (char) raf.readByte();
					if(a == 'G'){
						//GIF
						tractarGIF(raf);
					}else if(a == 'B'){
						//BMP
						tractarBMP(raf);
					}else{
						raf.seek(6);
						char j = (char)raf.readByte();
						if(j == 'J'){
							//JPG
							tractarJPG(raf, fitxer);
						}
						raf.seek(1);
						if((char)raf.readByte() == 'P'){
							tractarPNG(raf);
						}
					}
				}
			}else {
				System.out.println("El fitxer no existeix");
			}			
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}
	
	
	//1r nivell descendencia
	/**Mètode que retorna la paraula que ha inserit l'usuari
	 * @return paraula que ha inserit l'usuari
	 */
	public String llegirResposta(){
		Scanner lector = new Scanner(System.in);
		String resposta = lector.nextLine();
		return resposta;
	}
	
	//Tractar GIF
	/**Mètode que mostra les dades del GIF
	 * @param raf Objecte per a llegir les dades de l'arxiu
	 */
	public void tractarGIF(RandomAccessFile raf){
		try{
			String format = "";
			raf.seek(0);
			for(int x = 0;x<3;x++){ 
				char a = (char) raf.readByte();
				String b = String.valueOf(a);
				format = format.concat(b);
			}
			System.out.println("Tipus de fitxer: "+format);
			raf.skipBytes(3);
			System.out.println("Amplada: "+Short.reverseBytes(raf.readShort()));
			System.out.println("Altura: "+Short.reverseBytes(raf.readShort()));
			raf.skipBytes(1);
			System.out.println("Color Index del Fons: "+raf.readByte());
			//REVISAR la linea anterior
		}catch(Exception e){
			//BMP: https://es.wikipedia.org/wiki/Windows_bitmap
			//PNG: http://www.libpng.org/pub/png/spec/1.2/PNG-Structure.html
			//GIF: http://www.onicos.com/staff/iz/formats/gif.html#header
			//JPG: http://www.onicos.com/staff/iz/formats/jpeg.html
			//Conversió: https://www.rapidtables.com/convert/number/hex-to-decimal.html
		}
	}
	
	/**Mètode que mostra les dades del BMP
	 * @param raf Objecte per a llegir les dades de l'arxiu
	 */
	public void tractarBMP(RandomAccessFile raf){
		try{
			String format = "";
			raf.seek(0);
			for(int x = 0;x<2;x++){ 
				char a = (char) raf.readByte();
				String b = String.valueOf(a);
				format = format.concat(b);
			}
			System.out.println("Tipus de fitxer: "+format);
			System.out.println("Tamany del fitxer: "+Integer.reverseBytes(raf.readInt())+" bytes");
			raf.seek(18);
			System.out.println("Ample: "+Integer.reverseBytes(raf.readInt()));
			System.out.println("Altura: "+Integer.reverseBytes(raf.readInt()));
			System.out.println("Numero de plas: "+Short.reverseBytes(raf.readShort()));
			raf.skipBytes(2);
			System.out.println("Compresió: "+Integer.reverseBytes(raf.readInt()));
			System.out.println("Tamany de la imatge: "+Integer.reverseBytes(raf.readInt())+" bytes");
		}catch(Exception e){
			
		}
	}
	
	/**Mètode que mostra les dades del JPG
	 * @param raf Objecte per a llegir les dades de l'arxiu
	 * @param fitxer Objecte que permet fer el bucle
	 */
	public void tractarJPG(RandomAccessFile raf, File fitxer){
		try {
			raf.seek(6);
			System.out.print("Tipus de fitxer: ");
			for(int x = 0;x<4;x++){ 
				System.out.print((char)raf.readByte());
			}
			System.out.println();
			raf.skipBytes(1);
			//System.out.println("Versió: "+raf.readShort());
			System.out.print("Versió: "+raf.readByte()+".");
			System.out.println(raf.readByte());
			raf.seek(0);
			long comprovador = 0;
			for(int x = 0;x<fitxer.length();x++) {
				if(raf.readByte()== -1) {
					comprovador = -1;
				}
				if(raf.readByte() == -64 && comprovador == -1) {
					comprovador = raf.getFilePointer();
					break;
				}
				comprovador = 0;
			}
			raf.seek(comprovador+3);
			System.out.println("Altura: "+raf.readShort());
			System.out.println("Ample: "+raf.readShort());
			System.out.println("Numero de components: "+raf.readByte());
			
			//255,192
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	/**Mètode que mostra les dades del PNG
	 * @param raf Objecte per a llegir les dades de l'arxiu
	 */
	public void tractarPNG(RandomAccessFile raf){
		try {
			raf.seek(1);
			System.out.print("Tipus de fitxer: ");
			System.out.print((char)raf.readByte());
			System.out.print((char)raf.readByte());
			System.out.print((char)raf.readByte());
			System.out.println();
			raf.skipBytes(12);
			System.out.println("Ample: "+raf.readInt());
			System.out.println("Altura: "+raf.readInt());
			System.out.println("Profunditat de bit: "+raf.readByte());
			System.out.println("Tipus de color: "+raf.readByte());
			System.out.println("Mètode de compressió: "+raf.readByte());
			System.out.println("Mètode de filtratge: "+raf.readByte());
		} catch (Exception e) {
			// TODO: handle exception
		}
	}
}